// routes/form.ts
import { Request, Response } from 'express';
import User from '../models/User';

const submitForm = async (req: Request, res: Response) => {
  const { username, email, dob } = req.body;

  try {
    await User.create({ username, email, dob });
    res.send('Form submitted successfully!');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error submitting form.');
  }
};

export default submitForm;
