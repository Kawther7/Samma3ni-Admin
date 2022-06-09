import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser, updateUser } from "../../../redux/usersSlice/apiCalls";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import Button from "../../Button";
import TextField from "../../Inputs/TextField";
import Select from "../../Inputs/Select";
import Radio from "../../Inputs/Radio";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";


const genders = ["male", "female"];

const UserForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		gender: "",
	});
	const { users, createUserProgress, updateUserProgress } = useSelector(
		(state) => state.users
	);
	const [errors, setErrors] = useState({});
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors((errors) => ({ ...errors, [name]: value }));
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(3).max(10).required().label("Name"),
	};

	useEffect(() => {
		if (id !== "new" && users) {
			const user = users.filter((user) => user._id === id);
			setData({
				email: user[0].email,
				name: user[0].name,
				gender: user[0].gender,
			});
		}
	}, [id, users]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			if (id !== "new") {
				const res = await updateUser(id, data, dispatch);
				res && history.push("/users");
			} else {
				const res = await createUser(data, dispatch);
				res && history.push("/users");
			}
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Add New User" : "Edit User"} <PersonIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							label="What's your email?"
							placeholder="Enter your email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					{id === "new" && (
						<div className={styles.input_container}>
							<TextField
								label="Create a password"
								placeholder="Create a password"
								name="password"
								handleInputState={handleInputState}
								schema={schema.password}
								handleErrorState={handleErrorState}
								value={data.password}
								error={errors.password}
								type="password"
								required={true}
							/>
						</div>
					)}
					<div className={styles.input_container}>
						<TextField
							label="What should we call you?"
							placeholder="Enter a profile name"
							name="name"
							handleInputState={handleInputState}
							schema={schema.name}
							handleErrorState={handleErrorState}
							value={data.name}
							error={errors.name}
							required={true}
						/>
					</div>
					
					<div className={styles.input_container}>
						<Radio
							label="What's your gender?"
							name="gender"
							handleInputState={handleInputState}
							options={genders}
							value={data.gender}
							required={true}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Submit" : "Update"}
						isFetching={id === "new" ? createUserProgress : updateUserProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default UserForm;
