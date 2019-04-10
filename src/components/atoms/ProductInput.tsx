import * as React from 'react';
import fetchProductInfo from 'src/Utilities/fetchProductInfo';
import {IIdMember} from '../../App';

interface IProps {
    idMember: IIdMember;
    onChange: (value: string, idMember: any) => void;
    setProductVerified: (idMember: IIdMember, status: boolean, product?: any) => void;
    setProductQuantity: (idMember: IIdMember, quantity: number) => void;
}

class ProductInput extends React.Component<IProps> {
  public props: IProps;

  public render() {
    return (
        <div>
            <input
                style={{
                  border: '2px dotted black',
                  borderRadius: '4px',
                  fontSize: '15px',
                  height: '2rem',
                  margin: '1rem',
                  textAlign: 'center',
                  width: '27rem',
                }}
                maxLength={36}
                onChange={this.handleTextInputChange}
                value={this.props.idMember.productId || ''}
                placeholder="produkte id eingeben..."
            />
            <label>Menge: </label>
            <select  onChange={this.handleQuantityChange}>
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
            {this.props.idMember.verified ? <div style={{color: 'green'}}> {'Verifiziert!  ' + this.props.idMember.productTitle } </div>: null}
        </div>
    );
  }

  public handleTextInputChange = async (event: any) => {
    this.props.onChange(event.target.value, this.props.idMember);
// tslint:disable-next-line: no-console
    console.log(event.target.value.length);
    if (event.target.value.length === 36) {
      try {
      const product = await fetchProductInfo(event.target.value);
      this.props.setProductVerified(this.props.idMember, true, product)
      } catch (e) {
// tslint:disable-next-line: no-console
        console.log(e);
        this.props.setProductVerified(this.props.idMember, false)
      }
    } else {
      if (this.props.idMember.verified) {
        this.props.setProductVerified(this.props.idMember, false)
      }
    }
  }

  public handleQuantityChange = (event: any) => {
    this.props.setProductQuantity(this.props.idMember, event.target.value)
  }
}

export default ProductInput;