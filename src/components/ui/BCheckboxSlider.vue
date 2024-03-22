<template>
	<label class="switch" for="checkbox-public">
		<input id="checkbox-public" type="checkbox" :checked="userPublic" @click="$emit('changeUserPublic', userPublic)" />
		<div class="slider round"></div>
	</label>
</template>

<script>
export default {
	name: "BCheckboxSlider",
	props: {
		initialUserPublic: {
			type: Boolean,
			default: () => true,
		},
	},
	emits: ["changeUserPublic"],
	data() {
		return {
			userPublic: this.initialUserPublic,
		};
	},
};
</script>

<style lang="scss" scoped>
.switch {
	width: 38.5px;
	height: 18.5px;
	position: relative;
	display: inline-block;

	input {
		display: none;
	}
}

.slider {
	background-color: #ccc;
	bottom: 0;
	cursor: pointer;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transition: 0.4s;
}

.slider:before {
	background-color: #fff;
	bottom: 0px;
	content: "";
	height: 18.5px;
	left: 0px;
	position: absolute;
	transition: 0.4s;
	width: 18.5px;
}

input:checked + .slider {
	background-color: #3586ff;
}

input:checked + .slider:before {
	transform: translateX(20px);
}

.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
