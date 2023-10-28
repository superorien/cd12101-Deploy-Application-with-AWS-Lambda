import * as uuid from 'uuid'
import { TodosAccess } from "../dataLayer/todosAccess.mjs";
import { createLogger } from '../utils/logger.mjs'
import { AttachmentUtils } from "../fileStorage/attachmentUtils.mjs";

// Implement businessLogic
const logger = createLogger("Todos");
const todosAccess = new TodosAccess();
const attachmentUtils = new AttachmentUtils();

// get all
export async function getTodosForUser(userId) {
    logger.info("get all");
    return await todosAccess.getAll(userId);
}

// Update todo
export async function updateTodo(userId, todoId, updateToDoRequest) {
    logger.info("UPdate");

    return await todosAccess.updateTodo(userId, todoId, updateToDoRequest);
}

// update image
export async function updateAttachmentPresignedUrl(userId, todoId) {
    logger.info("Update image");

    return await todosAccess.updateAttachmentPresignedUrl(userId, todoId);
}

// Create
export async function createTodo(createTodoRequest, userId) {
    logger.info("create");

    const todoId = uuid.v4()
    const createdAt = new Date().toISOString();
    const s3AttachUrl = attachmentUtils.getAttachmentUrl(todoId);
    const todoItem = {
        todoId: todoId,
        userId: userId,
        createdAt,
        done: false,
        attachmentUrl: null,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate
    }

    return await todosAccess.createTodo(todoItem);
}

// Delete
export async function deleteTodo(userId, todoId) {
    logger.info("Delete");

    return await todosAccess.deteteTodo(userId, todoId);
}
