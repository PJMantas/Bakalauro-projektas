export class Permission {
    id!: number;
    group_name!: string;
    video_create!: boolean;
    video_edit!: boolean;
    video_delete!: boolean;
    reaction_create!: boolean;
    comment_create!: boolean;
    comment_edit!: boolean;
    comment_delete!: boolean;

    // admin-only permissions
    is_admin!: boolean;
    manage_users!: boolean;
    manage_permissions!: boolean;
    manage_genres!: boolean;

}