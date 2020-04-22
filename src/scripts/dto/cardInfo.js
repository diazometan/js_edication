export default class CardInfo {
    constructor(id, name, link, ownerId, isLiked, likeCount) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.ownerId = ownerId;
        this.isLiked = isLiked;
        this.likeCount = likeCount;
    }
}