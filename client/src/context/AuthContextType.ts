import { Theme } from "@emotion/react";
import { User } from "../types/User";
import { Entry } from '../types/Entry'
import { Token } from "../types/Token";

export type AuthContextType = {
    handle_theme: () => void;
    current_theme: Partial<Theme>;
    user: User;
    setUser: (input: User) => void;
    entry: Entry | undefined;
    setEntry: (input: Entry) => void;
    message: string;
    setMessage: (input: string) => void;
    token: Token;
    setToken: (input: Token) => void;
    disabled: boolean;
    setDisabled: (input: boolean) => void;
    error: string;
    setError: (input: string) => void;
    login: (input: unknown) => void;
    logout: () => void;
    openMessage: boolean;
    openError: boolean;
    openBackdrop: boolean;
    setOpenMessage: (input: boolean) => void;
    setOpenError: (input: boolean) => void;
    setOpenBackdrop: (input: boolean) => void;
    clearMessage: () => void;
    clearError: () => void;
    handleCloseMessage: () => void;
    handleCloseError: () => void;
    handleCloseBackdrop: () => void;  
  };