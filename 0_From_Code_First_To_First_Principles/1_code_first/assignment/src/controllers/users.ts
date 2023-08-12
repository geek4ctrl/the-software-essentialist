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

const editUser = async (req: Request, res: Response, next: NextFunction) => {

    let id: string = req.params.id;

    let email: string = req.body.email;
    let username: string = req.body.username;
    let firstName: string = req.body.firstName;
    let lastName: string = req.body.lastName;

    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        ...(email && { email }),
        ...(username && { username }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName })
    });

    return res.status(200).json({
        message: response.data
    })

}

export default { getUsers, getUser, editUser, createUser };