import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Chơi game cày tiền");
    }

    setEventBtn(callback) {
    }

    load() {
        console.log("MiniGame.load()");
    }

    getHtml() {
        return `
<canvas id="canvas" style="width: 600px; height: 900px;"></canvas>
`;
    }
}