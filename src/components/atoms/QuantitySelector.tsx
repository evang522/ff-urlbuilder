import * as React from 'react';

interface IProps {
  onChange: (value: number) => void;
  desiredIdCount: number;
}

class QuantitySelector extends React.Component<IProps> {
  public props: IProps;

  constructor(props: IProps) {
      super(props);
  }

  public render() {
    return (
        <div>
            Wie viele verschiedene Produkte?
            <select value={this.props.desiredIdCount} onChange={this.handleSelectChange}>
                <option disabled={true} value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
        </div>
    );
  }

  public handleSelectChange = (event: any) => {
    this.props.onChange(event.target.value);
  }
}

export default QuantitySelector;