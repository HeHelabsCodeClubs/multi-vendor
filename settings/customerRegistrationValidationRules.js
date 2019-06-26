export default [
    [
        {
            type: 'empty',
            context: 'First name',
            inputState: 'firstName'
        }
    ],
    [
        {
            type: 'empty',
            context: 'Last name',
            inputState: 'lastName'
        }
    ],
    [
        {
            type: 'empty',
            context: 'Email',
            inputState: 'email'
        },
        {
            type: 'email',
            context: 'Email',
            inputState: 'email'
        }
    ],
    [
        {
            type: 'empty',
            context: 'Password',
            inputState: 'password'
        }
    ],
    [
        {
            type: 'empty',
            context: 'Password confirmation',
            inputState: 'passwordRepeat'
        },
        {
            type: 'password_confirmation',
            context: 'Password confirmation',
            inputState: 'passwordRepeat'
        }
    ]
];
