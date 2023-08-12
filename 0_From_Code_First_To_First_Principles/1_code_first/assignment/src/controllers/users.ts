import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let users: [User] = result.data;
    return res.status(200).json({
        message: users
    })

}

const getUser = async (req: Request, res: Response, next: NextFunction) => {

    let email: string = req.params.email;

    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${email}`);
    let user: User = result.data;

    if (user) {
        return res.status(200).json({
            error: undefined,
            data: user,
            success: true
        });
    } else {
        return res.status(404).json({
            error: "UserNotFound",
            data: undefined,
            success: false
        });
    }

}

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    let email: string = req.body.email;
    let username: string = req.body.username;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;

    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
        email, username, firstName, lastName
    });

    return res.status(200).json({
        error: undefined,
        data: { email, username, firstName, lastName },
        success: true
    })

}