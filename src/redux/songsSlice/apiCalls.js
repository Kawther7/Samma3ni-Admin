import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createSong = async (song, dispatch) => {
	dispatch(actions.createSongStart());
	try {
		const { data } = await axiosInstance.post("http://localhost:8080/api/songs/create", song);
		dispatch(actions.createSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createSongFailure());
		return false;
	}
};

export const getAllSongs = async (dispatch) => {
	dispatch(actions.getAllSongsStart());
	try {
		const { data } = await axiosInstance.get("http://localhost:8080/api/songs/getall/get");
		dispatch(actions.getAllSongsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllSongsFailure());
		return false;
	}
};

export const updateSong = async (id, song, dispatch) => {
	dispatch(actions.updateSongStart());
	try {
		const { data } = await axiosInstance.put(`http://localhost:8080/api/songs/update/${id}`, song);
		dispatch(actions.updateSongSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateSongFailure());
		return false;
	}
};

export const deleteSong = async (id, dispatch) => {
	dispatch(actions.deleteSongStart());
	try {
		const { data } = await axiosInstance.delete(`http://localhost:8080/api/songs/delete/${id}`);
		dispatch(actions.deleteSongSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteSongFailure());
		return false;
	}
};
