export interface Image {
    link: string;
}

export class Project {
    id: string;
    user: string;
    name: string;
    content: string;
    views: number;
    projectType: string;
    images: Image[];
}
