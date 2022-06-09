import axiosInstance from "../axiosInstance";
import * as actions from "./index";

export const getAllPlaylists = async (dispatch) => {
	dispatch(actions.getAllPlaylistsStart());
	try {
		const { data } = await axiosInstance.get("http://localhost:8080/api/playlists/getall/getall");
		dispatch(actions.getAllPlaylistsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllPlaylistsFailure());
		return false;
	}
};
