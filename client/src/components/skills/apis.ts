import customAxios from '../../axios.config';
import {
    PostResponse,
    SkillsData,
    SkillsFormValues,
} from '../../interfaces/interface';

export const addSkills = (data: SkillsFormValues) => {
    return customAxios.post<PostResponse>('/add-skill', {
        ...data,
    });
};

export const getSkills = () => {
    return customAxios.get<SkillsData>('/get-skills');
};

export const removeSkill = (id: string) => {
    return customAxios.delete<PostResponse>(`/remove-skill/${id}`);
};
