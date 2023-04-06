import { object, string } from 'joi';

const uploadImageSchema = object({
    email: string().email().required() 
});

const profileUpdateSchema = object({
    description: string().min(1).max(2000),
    school: string().min(1).max(200),
    work: string().min(1).max(200),
    igId: string().min(1).max(100),
    snapId: string().min(1).max(100),
    location: string().min(1).max(100),
    interests: string().min(1).max(1000),
    pic1: string().min(1).max(1000),
    pic2: string().min(1).max(1000),
    pic3: string().min(1).max(1000),
    pic4: string().min(1).max(1000),
    pic5: string().min(1).max(1000)
});

export { uploadImageSchema, profileUpdateSchema };