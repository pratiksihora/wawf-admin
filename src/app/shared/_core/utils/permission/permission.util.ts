export class PermissionUtil {
    /**
      * Make permission array
      * @param permissions {Array<object>} : permission for module access
      */
    public static setPermission(permissions: Array<Object>) {
        const permissionArray = [];
        permissions.forEach(permission => {
            const name = permission['brp_ps_name'].trimStart().trimEnd().split(' ').join('_').toUpperCase();
            // const name = 'GALLERY';
            if (permission['brp_manage']) {
                permissionArray.push([name, 'MANAGE'].join('_'));
            }

            if (permission['brp_view']) {
                permissionArray.push([name, 'VIEW'].join('_'));
            }
        });
        return permissionArray;
    }
}