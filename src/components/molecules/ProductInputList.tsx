import * as React from 'react';
import {IIdMember} from '../../App';
import ProductInput from '../atoms/ProductInput';

interface IProps {
    idList: IIdMember[];
    onChange: (value: string, idMember: IIdMember) => void;
    setProductVerified: (idMember: IIdMember, status: boolean) => void;
    setProductQuantity: (idMember: IIdMember, quantity: number) => void;
}

class ProductInputList extends React.Component<IProps> {
  public props: IProps;

  public render() {
    return (
        <div style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {this.generateIdList()}
        </div>
    );
  }

  public generateIdList = () => {
      return this.props.idList.map((idMember: IIdMember, index: number) => {
        return (
          <ProductInput
            setProductVerified={this.props.setProductVerified}
            onChange={this.props.onChange}
            key={index}
            idMember={idMember}
            setProductQuantity={this.props.setProductQuantity}
          />
      )})
  }

}

export default ProductInputList;