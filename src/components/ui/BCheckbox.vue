<template>
	<label class="container" for="checkbox-personal_data">
		<input
			id="checkbox-personal_data"
			type="checkbox"
			:checked="personalDataProcessingAgreement"
			@click="$emit('changeAgreement', personalDataProcessingAgreement)"
		/>
		<span class="checkmark"></span>
	</label>
</template>

<script>
export default {
	name: "BCheckbox",
	props: {
		initialAgreement: {
			type: Boolean,
			default: () => true,
		},
	},
	emits: ["changeAgreement"],
	data() {
		return {
			personalDataProcessingAgreement: this.initialAgreement,
		};
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 19px;
	width: 19px;
	border-radius: 5px;
	background-color: #eee;
}

.container:hover input ~ .checkmark {
	background-color: #ccc;
}

.container input:checked ~ .checkmark {
	background-color: #2196f3;
}

.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

.container input:checked ~ .checkmark:after {
	display: block;
}

.container .checkmark:after {
	left: 7px;
	top: 4px;
	width: 3px;
	height: 6px;
	border: solid white;
	border-width: 0 2px 2px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
