import * as React from 'react';
import './App.css';
import Headline from './components/atoms/Headline';
import QuantitySelector from './components/atoms/QuantitySelector';
import ProductInputList from './components/molecules/ProductInputList';
import calculateUrl from './Utilities/calculateUrl';


interface IState {
  desiredIdCount: number;
  idList: IIdMember[];
  baseUrl: string;
}

export interface IIdMember {
  uuid: string;
  productId: string | null;
  quantity: number | null;
  productTitle: string | null;
  verified: boolean;
}

class App extends React.Component {
  public state: IState = {
    baseUrl: 'https://www.v2.fitfox.de',
    desiredIdCount: 0,
    idList: [],
  }
// tslint:disable: jsx-no-lambda
  public render() {
    return (
      <div className="App">
        <Headline text="Fitfox Checkout URL Builder" />
        <select onChange={e => this.setBaseUrl(e.target.value)}>
          <option value="https://www.v2.fitfox.de">Production</option>
          <option value="https://www.staging.v2.fitfox.de">Staging</option>
        </select>
        <QuantitySelector desiredIdCount={this.state.desiredIdCount} onChange={this.handleProductCountChange}/>
        <ProductInputList
          idList={this.state.idList}
          onChange={this.handleProductSelectorInputChange}
          setProductVerified={this.setProductVerified}
          setProductQuantity={this.setProductQuantity}
          baseUrl={this.state.baseUrl}
        />
        <br/>
        <br/>
        <div style={{width: '80%', margin: '0 auto'}}>
        <a href={calculateUrl(this.state.idList, this.state.baseUrl)} target="_blank" rel="noreferrer">
          {calculateUrl(this.state.idList, this.state.baseUrl)}
        </a>
        </div>
      </div>
    );
  }

  public setBaseUrl = (url: string) => {
    this.setState({
      baseUrl: url,
      desiredIdCount: 0,
      idList: [],
    })
  }

  public handleProductSelectorInputChange = (value: string, idMember: IIdMember) => {
    const newArr = [...this.state.idList.filter((idMemberInState: IIdMember) => idMemberInState.uuid !== idMember.uuid ),
      {...idMember, productId: value}];
    this.setState({
      idList: [
        ...newArr.sort((a: IIdMember,b: IIdMember) => (Number(a.uuid) - Number(b.uuid))),
      ]
    })
  }

  public handleProductCountChange = (value: number): void => {
    const makeDefaultIdMember = (): IIdMember => ({
      productId: null,
      productTitle: null,
      quantity: 1,
      uuid: (Math.random() * 1000000).toString(),
      verified: false,
    });

    const defaultProductArr: any[] = [];
    if (this.state.idList.length < value) {
      const difference = value - this.state.idList.length;
      for (let i = 0; i < difference; i++) {
        defaultProductArr.push({...makeDefaultIdMember()})
      }
    }
    this.setState({
      desiredIdCount: Number(value),
      idList: [
        ...this.state.idList,
        ...defaultProductArr,
      ].slice(0, value).sort((a: IIdMember,b: IIdMember) => (Number(a.uuid) - Number(b.uuid))),
    })
  }

  public setProductVerified = (idMember: IIdMember, status: boolean, product?: any): void => {
    let productTitle: string = '';
    if (product) {
      if (product.discriminator === 'event') {
          productTitle = `${product.eventOccurrence.name} - ${product.name} - Product Type:  ${product.discriminator}`; 
      }

      if (product.discriminator === 'studio') {
        productTitle = `${product.studio.name} - ${product.name} - Product Type:  ${product.discriminator}`; 
      }
    }

    const newArr = [...this.state.idList.filter((idMemberInState: IIdMember) => idMemberInState.uuid !== idMember.uuid ),
      {
        ...idMember,
        verified: status,
        ...(product && {productTitle}) 
      }];
    this.setState({
      idList: [
      ...newArr.sort((a: IIdMember,b: IIdMember) => (Number(a.uuid) - Number(b.uuid))),
      ],
    })
  }

  public setProductQuantity = (idMember: IIdMember, quantity: number): void => {
    const newIdList = [...this.state.idList.filter((idMemberInState: IIdMember) => idMemberInState.uuid !== idMember.uuid ),
      {...idMember, quantity}];
      this.setState({
        idList: [
          ...newIdList.sort((a: IIdMember,b: IIdMember) => (Number(a.uuid) - Number(b.uuid))),
        ]
      })
  }
}

export default App;
