import {useState, FormEvent} from 'react';
import styles from './LoginForm.module.css';
import {useAuth} from "../providers/useAuth.ts";

export enum FORM_MODE {
    REGISTER = 'register',
    LOGIN = 'login'
};

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formMode, setFormMode] = useState(FORM_MODE.LOGIN);

    const {authUser} = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await authUser(email, password, formMode);

        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Авторизация</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Введите email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='password'>Пароль</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Введите пароль'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' style={{marginRight: 15}}>
                        Войти
                    </button>
                    <button type='submit' onClick={() => setFormMode(FORM_MODE.REGISTER)}>
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    );
};