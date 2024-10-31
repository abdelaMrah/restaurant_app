import ApiService from "../../../api/ApiService";
export interface Permission {
  id: number;
  name: string;
  description: string;
}
export interface RolePermission {
  permission: Permission;
}
export interface RoleResponse {
  id: 2;
  name: string;
  description: string;
  rolePermissions: RolePermission[];
}
export interface CreateRoleDto {
  name: string;
  description: string;
  permissions?: number[];
}
export type UpdateRoleDto=Partial<CreateRoleDto>;

class RoleService {
  private apiService = ApiService;

  public async getRoles(): Promise<RoleResponse[]> {
    try {
      const response = await this.apiService
        .getInstance()
        .get<RoleResponse[]>("/user/roles");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async getPermissions(): Promise<Permission[]> {
    try {
      const response = await this.apiService
        .getInstance()
        .get<Permission[]>("/user/permissions");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async createRole(createRoleDto: CreateRoleDto) {
    try {
      const response = await this.apiService
        .getInstance()
        .post<RoleResponse>(`/user/roles`, createRoleDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  public async updateRole(id:number,updateRoleDto:UpdateRoleDto){
    try {
        const response =await this.apiService.getInstance().patch<RoleResponse>(`/user/roles/${id}`,updateRoleDto)
        return response.data;
    } catch (error) {
        throw error;
    }
  }
  public async deleteRole(id:number){
    try {
        const response =await this.apiService.getInstance().delete<RoleResponse>(`/user/roles/${id}`)
        return response.data;
    } catch (error) {
        throw error;
    }
  }
}

export default new RoleService();
