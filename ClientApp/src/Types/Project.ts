import Technology from "./Technology";

type Project = {
    "authorID": string,
    "name": string,
    "description": string,
    "technologies": Array<Technology>,
    "githubLink": string,
    "likes": number,
    "photo": string,
    "id": string
    "isLiked" : boolean,
    "authorLogin": string,
    "authorName": string
}

export default Project;