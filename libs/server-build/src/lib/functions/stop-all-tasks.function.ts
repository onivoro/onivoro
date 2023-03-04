import { generateAppMetadata } from "@onivoro/server-common";
import { shell } from "./shell.function";

export function stopAllTasks(project: string, target: 'production' | 'staging') {
    const { app } = generateAppMetadata(project);
    const isProduction = target === 'production';
    const prefix = isProduction ? app : `${app}-staging`;
    const cluster = `${prefix}-cluster`;
    const task = shell(`aws ecs list-tasks --cluster ${cluster} --service ${prefix}-service --output text --query taskArns[0]`);

    if(task && task.toLowerCase().trim() !== 'none') {
        shell(`aws ecs stop-task --cluster  ${cluster} --task ${task}`);
    }
}