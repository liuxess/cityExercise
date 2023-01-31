import { USER_ROLES } from "../../../config/enums/UserRoles";

export const AssignRole = (userRoles) => {
    return {
        type: 'Assign Role',
        UserRole: userRoles,
    };
};

export const ResetRole = () => {
    return {
        type: 'Reset Role',
    };
};

export const ExtractRolesFromAuthorities = (authorities) => {
    let userRoles = authorities.map(auth=>auth.authority).map(auth=>USER_ROLES[auth]);
    return AssignRole(userRoles);
}