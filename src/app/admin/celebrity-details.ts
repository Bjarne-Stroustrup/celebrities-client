export class CelebrityDetails{
    constructor(
        public id: number,
        public name: string,
        public info: string,
        public image:  HTMLImageElement,
        public trained: boolean){}
}