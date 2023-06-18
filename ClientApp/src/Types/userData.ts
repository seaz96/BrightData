import Project from "./Project"

type userData = {
    login: string,
    email: string,
    name: string,
    vkLink: string,
    telegramLink: string,
    description: string,
    photo: string,
    projects: Array<Project>,
    id: string
}

export default userData;