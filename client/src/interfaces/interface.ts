// comman interfaces
export interface PostResponse {
    message: string;
}

// bio interfaces
export interface BioFormValues {
    bio: string;
}

export interface BioData {
    data: {
        _id: string;
        bio: string;
    };
}

// skills interfaces
export interface SkillsFormValues {
    skillName: string;
    type: string;
    imageUrl: string;
}

export interface SkillsData {
    data: {
        _id: string;
        skillName: string;
        type: string;
        imageUrl: string;
    }[];
}

export interface SkillsState {
    _id: string;
    skillName: string;
    type: string;
    imageUrl: string;
}
