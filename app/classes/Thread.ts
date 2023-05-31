export default class Thread {
    _id: string;
    title: string;
    category: string;
    text: string;

    constructor(title: string, category: string, text: string) {
        this._id = Date.now().toString();
        this.title = title;
        this.category = category;
        this.text = text;
    }
}