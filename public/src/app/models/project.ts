export interface Image {
    link: string;
}

export class Project {
    _id: string;
    user: string;
    name: string;
    content: string;
    views: number;
    projectType: string;
    // url: string;
    image: Image;
    images: Image[];
}
