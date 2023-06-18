import Technology from "./Technology";

type Project = {
    "authorID": string,
    "name": string,
    "description": string,
    "technologies": Array<Technology>,
    "githubLink": string,
    "likes": number,
    "photo": string,
    "id": number
}

export default Project;