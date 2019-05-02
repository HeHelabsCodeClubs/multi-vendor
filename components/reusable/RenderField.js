
import Select2 from 'react-select2-wrapper';

class RenderField extends React.Component {
	renderInputs(fieldInput) {
		const {
			meta: { error, touched }
		} = fieldInput;
		const showError = touched ? error : "";
		if (fieldInput.type === 'textarea') {
			return (
				<div>
					<label>{fieldInput.label}</label>
					<textarea
						value={fieldInput.value}
						{...fieldInput.input}> </textarea>
					<span className='errorFormat'>{showError}</span>
				</div>
			);
		}
		if (fieldInput.type === 'select') {
			if (fieldInput.multipleAttr) {
				return (
					<div>
						<label>{fieldInput.label}</label>
						<Select2
							multiple
							defaultValue={fieldInput.defaultValue}
							data={fieldInput.data}
							options={{
								placeholder: fieldInput.placeholder
							}}
							value={fieldInput.value}
							{...fieldInput.input}
						/>
						<span className='errorFormat'>{showError}</span>
					</div>
				);
			}

			return (
				<div>
					<label>{fieldInput.label}</label>
					<Select2
						defaultValue={fieldInput.defaultValue}
						data={fieldInput.data}
						options={{
							placeholder: fieldInput.placeholder
						}}
						value={fieldInput.value}
						{...fieldInput.input}
					/>
					<span className='errorFormat'>{showError}</span>
				</div>
			);
		}

		if (fieldInput.type === 'checkbox') {
			return (
				<div>
					<label>{fieldInput.label}</label>
					<input
						id={fieldInput.id}
						name={fieldInput.name}
						type={fieldInput.kind}
						value={fieldInput.value}
						placeholder={fieldInput.placeholder}
						{...fieldInput.input}
					/>
					<span className='errorFormat'>{showError}</span>
				</div>
			);
		}
		if (fieldInput.type === 'input') {
			return (
				<div>
					<label>{fieldInput.label}</label>
					<input
						id={fieldInput.id}
						name={fieldInput.name}
						type={fieldInput.kind}
						value={fieldInput.value}
						defaultValue={fieldInput.defaultValue}
						placeholder={fieldInput.placeholder}
						{...fieldInput.input}
					/>
					<span className='errorFormat'>{showError}</span>
				</div>
			);
		}
		return (
			<div>
				<label>{fieldInput.label}</label>
				<input
					id={fieldInput.id}
					name={fieldInput.name}
					type={fieldInput.kind}
					defaultValue={fieldInput.defaultValue}
					value={fieldInput.value}
					placeholder={fieldInput.placeholder}
					{...fieldInput.input}
				/>
				<span className='errorFormat'>{showError}</span>
			</div>
		);
	}
	render() {
		const { fieldInput } = this.props;
		return <div>{this.renderInputs(fieldInput)}</div>;
	}
}

export default RenderField;
