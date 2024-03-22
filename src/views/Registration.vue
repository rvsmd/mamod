<template>
	<main class="registration">
		<h2 style="margin-top: 24px; margin-left: 31px">Регистрация</h2>
		<span class="separative-line" style="margin-top: 20px"></span>
		<form @submit.prevent="submitRegistrationForm">
			<h4 style="margin-top: 21px; margin-left: 31px">Заполните Ваши данные</h4>
			<div class="registration-form">
				<div style="width: 100%; display: flex; justify-content: space-between">
					<input
						id="user-name"
						v-model.trim="user.username"
						:class="[isFormValid || user.username ? '' : 'validate-field', 'registration-field']"
						type="text"
						name="user-name"
						placeholder="Имя"
					/>
					<input
						id="user-email"
						v-model.trim="user.email"
						:class="[validateEmail ? '' : 'validate-field', 'registration-field']"
						type="email"
						name="user-email"
						placeholder="Email"
					/>
				</div>
				<div style="width: 100%; display: flex; justify-content: flex-end">
					<div :class="[isFormValid || user.role ? '' : 'validate-field', 'registration-field']" style="padding: 0">
						<v-select
							v-model="user.role"
							label="name"
							clearable
							placeholder="Должность"
							:options="roles"
							:reduce="(option) => option.value"
						/>
					</div>
				</div>
				<div style="width: 100%; display: flex; justify-content: space-between">
					<div :class="[isFormValid || user.password ? '' : 'validate-field', 'registration-field']" style="padding: 0">
						<input
							id="user-password"
							v-model.trim="user.password"
							style="width: 100%; height: 100%; padding: 10px; border: none"
							:type="showPassword ? 'text' : 'password'"
							name="user-password"
							placeholder="Пароль"
						/>
						<img
							:src="
								showPassword
									? require('../assets/icons/shown-icon.svg')
									: require('../assets/icons/masked-icon.svg')
							"
							alt="show-pass"
							style="position: absolute; right: 14px; top: 14px; cursor: pointer"
							@click.prevent="showPassword = !showPassword"
						/>
					</div>
					<div style="position: relative">
						<div :class="[passwordsMatch ? '' : 'validate-field', 'registration-field']" style="padding: 0">
							<input
								id="user-password_repeat"
								v-model.trim="user.password_repeat"
								style="width: 100%; height: 100%; padding: 10px; border: none"
								:type="showPasswordRepeat ? 'text' : 'password'"
								name="user-password_repeat"
								placeholder="Повторите пароль"
							/>
							<img
								:src="
									showPasswordRepeat
										? require('../assets/icons/shown-icon.svg')
										: require('../assets/icons/masked-icon.svg')
								"
								alt="show-pass"
								style="position: absolute; right: 14px; top: 14px; cursor: pointer"
								@click.prevent="showPasswordRepeat = !showPasswordRepeat"
							/>
						</div>
						<span v-if="!passwordsMatch" style="position: absolute; top: 220; color: red">Пароли не совпадают</span>
					</div>
				</div>
			</div>
			<span class="separative-line" style="margin-top: 30px"></span>
			<div style="margin-top: 26px; margin-left: 31px; display: flex">
				<b-checkbox-slider :initial-user-public="user.public" @changeUserPublic="user.public = !user.public" />
				<div style="margin-left: 5px">
					<h4>Хотите чтобы Ваш профиль видели другие участники платформы?</h4>
					<span style="margin-top: 10px; font-size: 14px; color: #696977">
						Включает профиль для просмотра другими пользователями по ссылке
					</span>
				</div>
			</div>
			<div style="margin: 31px 15px 66px 31px; display: flex; justify-content: space-between">
				<div style="display: flex">
					<b-checkbox
						:initial-agreement="personalDataProcessingAgreement"
						@changeAgreement="personalDataProcessingAgreement = !personalDataProcessingAgreement"
					/>
					<div style="font-size: 14px">
						<p>
							Регистрируясь, Вы соглашаетесь с
							<a style="color: #3586ff; cursor: pointer; user-select: none">политикой конфиденциальности</a> <br />
							и обработкой
							<a style="color: #3586ff; cursor: pointer; user-select: none">персональных данных</a>
						</p>
					</div>
				</div>
				<button class="registration-btn" :disabled="!personalDataProcessingAgreement">Зарегистрироваться</button>
			</div>
		</form>
	</main>
</template>

<script>
import vSelect from "vue-select";
import BCheckbox from "../components/ui/BCheckbox.vue";
import BCheckboxSlider from "../components/ui/BCheckboxSlider.vue";

export default {
	name: "RegistrationPage",
	components: {
		vSelect,
		BCheckbox,
		BCheckboxSlider,
	},
	data() {
		return {
			user: {
				public: true,
				username: "",
				role: null,
				email: "",
				password: "",
				password_repeat: "",
			},
			showPassword: false,
			showPasswordRepeat: false,
			personalDataProcessingAgreement: true,
			isFormValid: true,
			roles: [
				{ value: 1, name: "test-1" },
				{ value: 2, name: "test-2" },
				{ value: 3, name: "test-3" },
				{ value: 4, name: "test-4" },
			],
		};
	},
	computed: {
		validateEmail() {
			if (this.isFormValid) return true;
			return /^[^@]+@\w+(\.\w+)+\w$/.test(this.user.email);
		},
		passwordsMatch() {
			if (this.isFormValid) return true;
			return this.user.password === this.user.password_repeat;
		},
	},
	methods: {
		validateForm() {
			for (const key in this.user) {
				if (key === "public") continue;
				if (!this.user[key]) {
					this.isFormValid = false;
					return false;
				}
			}
			if (this.user.password !== this.user.password_repeat) {
				this.isFormValid = false;
				return false;
			}
			return true;
		},
		submitRegistrationForm() {
			if (!this.validateForm()) return;
			localStorage.setItem("user", JSON.stringify(this.user));
			this.$router.push("/");
		},
	},
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";

.registration {
	margin: 80px auto;
	width: 960px;
	height: 547px;
	border: 2px solid #e6e6e6;
	border-radius: 10px;
	background-color: #ffffff;
	font-size: 16px;
}
.registration-form {
	margin: 0px 15px 30px 31px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.registration-field {
	margin-top: 31px;
	width: 450px;
	height: 38px;
	padding: 10px;
	position: relative;
	border: 1px solid #e6e6e6;
	background-color: #fff;
	border-radius: 10px;
}
.registration-btn {
	width: 302px;
	height: 40px;
	padding: 5px;
	border: none;
	border-radius: 8px;
	background-color: rgba(73, 122, 218, 0.2);
	color: #497ada;
	border-radius: 5px;
	cursor: pointer;
}

.separative-line {
	width: 100%;
	height: 1px;
	display: block;
	background-color: #d9d9d9;
}
.validate-field {
	border-color: red !important;
}

.vs__search {
	padding: 3px 8px !important;
	font-size: 14px !important;
	color: #9292a0 !important;
}
.vs__dropdown-toggle {
	border: none;
}
</style>
