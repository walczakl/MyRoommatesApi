import AppController from "./app_controller.js";

class FlatController extends AppController {
    constructor() {
        super()
    }
    createFlat(req, res, next) {
        super.isAuth(req, res, next);
        res.status(200).json({ message: "Oki doki" });
    }
}


export default FlatController