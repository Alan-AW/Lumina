// /**
//  * 刷新
//  */
import { createAction } from "@reduxjs/toolkit";

type updateParams={
    routeKey:string,
    status:boolean

}

export const registerRefresh = createAction<string>("Refresh/Name");
export const uppdateRefresh = createAction<updateParams>("Refresh/update");
