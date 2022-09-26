import uploadReceipt from "../middleware/upload.js";
import Image from "../models/image.js";
import AppController from "./app_controller.js";
import path from 'node:path';
import Receipt from "../models/receipt.js";
import Payoff from "../models/payoffs.js";
import User from "../models/user.js";
import { Op } from "sequelize";

class ReceiptController extends AppController {
  constructor() {
    super();
  }
  createReceipt = async (req, res, next) => {
    uploadReceipt(req, res, async function(err) {
        if(err){
            console.log(err)
            res.status(400)
            return
        }
        const receipt = await Receipt.create({
            amount: req.body.amount,
            flat_id: req.body.flat_id,
        }).catch(err => console.log(err))
        if(req.files.length > 0) {
            for(const file of req.files) {
                const image = await Image.create({
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    filename: file.filename,
                    path:  file.path, //path.join(path.dirname(__filename),file.path)
                    size: file.size,
                })
                image.addReceipt(receipt.id, image.id).catch(err => console.log(err))
            }
        }
        if(req.body.payoffs && req.body.payoffs.length > 0) {
            for(const payoffReq of req.body.payoffs) {
                const payoff = await Payoff.create({
                    receipt_id: receipt.id,
                    amount: payoffReq.amount,
                    paying_user_id: parseInt(payoffReq.paying_user_id),
                    owe_user_id: parseInt(payoffReq.owe_user_id),
                }).catch(err => console.log(err))
            }
        }
        res.status(200).json("Created");
    }).catch((err) => {
        console.log(err)
        res.statue(400)
    })
  };

  getSummary = async (req, res, next) => {
    const userId = req.params.user_id
    const receipts = await Receipt.findAll({
        where: {
            flat_id: req.params.flat_id,
            closed: 0
        },
        include: [
            {
                model: Payoff,
                include: [
                    {
                        model: User,
                        as: 'oweUser'
                    },
                    {
                        model: User,
                        as: 'payUser'
                    },
                ],
                where: {
                    [Op.or]: [{paying_user_id: userId}, {owe_user_id: userId}]  
                }
            },
            {
                model: Image,
                as: "images",
                through: { attributes: [] }
            }
        ],
    }).catch(e => console.log(e))
    const payed = {};
    const owed = {};
    for(const receipt of receipts) {
        for(const payoff of receipt.payoffs) {
            if(payoff.paying_user_id == userId) {
                if(payed?.[payoff.owe_user_id]) {
                    payed[payoff.owe_user_id].amount += payoff.amount
                }
                else payed[payoff.owe_user_id] = {
                    amount: payoff.amount,
                    user_id: payoff.owe_user_id,
                    user_name: payoff.oweUser.username
                }
            } else {
                if(owed?.[payoff.paying_user_id]){
                    owed[payoff.paying_user_id].amount += payoff.amount
                } 
                else owed[payoff.paying_user_id] = {
                    amount: payoff.amount,
                    user_id: payoff.paying_user_id,
                    user_name: payoff.payUser.username
                } 
            }
        }
    }
    const summary = {};
    for(const payed_id in payed) {
        const payment = payed[payed_id]
        const oweding = owed?.[payed_id]
        if(!oweding) {
            summary[payed_id] = {
                user_id: parseInt(payed_id),
                user_name: payment.user_name,
                amount: payment.amount,
                pay_to: parseInt(userId),
            }
        }
        else if(payment.amount > oweding.amount) {
            summary[payed_id] = {
                user_id: parseInt(payed_id),
                user_name: payment.user_name,
                amount: payment.amount - oweding.amount,
                pay_to: parseInt(userId),
            }
        } else {
            summary[payed_id] = {
                user_id: parseInt(payed_id),
                user_name: payment.user_name,
                amount:  oweding.amount - payment.amount,
                pay_to: parseInt(payed_id),
            }
        }
    }

    for(const owed_id in owed) {
        if(summary?.[owed_id]) continue
        summary[owed_id] = {
            user_id: parseInt(owed_id),
            user_name: owed[owed_id].user_name,
            amount:  owed[owed_id].amount,
            pay_to: parseInt(owed_id),
        }
    }
    res.status(202).json(summary);
  }

  getPhoto = async (req, res, next) => {
    const file = `${path.dirname(__filename)}/uploads/${req.params.filename}`;
    res.download(file);
  }

}
export default ReceiptController;