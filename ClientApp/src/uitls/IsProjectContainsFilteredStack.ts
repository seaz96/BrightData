import { Project } from "Types"

const IsProjectContainsFilteredStack = (technologies: Array<string>, project: Project) => {
    const projectTechnologies = project.technologies.map(technology => technology.name)

    for(let i = 0; i < technologies.length; i++) {
        if(!projectTechnologies.includes(technologies[i])) return false;
    }
    return true;
}
export default IsProjectContainsFilteredStack;