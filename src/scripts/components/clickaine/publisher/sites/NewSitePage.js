import React from 'react';

export default class NewSitePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      description: '',
      showProveOwnershipBtn: false
    };
  }
  handleChangeUrl(e) {
    const url = e.target.value;
    const checkUrl = /(((http):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/;
    if (checkUrl.test(url)) {
      this.setState({ showProveOwnershipBtn: true })
    } else {
      this.setState({ showProveOwnershipBtn: false })
    }
    this.setState({ url });
  }
  handleChangeDescription(e) {
    const description = e.target.value;
    this.setState({ description });
  }
  render() {
    const { showProveOwnershipBtn } = this.state;
    return (
      <div className="active-page--container">
        <header className="active-page--header">
          <h5 className="padding active-page--title--small">{'Sites'}</h5>
          <h1 className="active-page--title">{'New site'}</h1>
        </header>
        <section className="new-page-form padding">
          <form className="form">
            <input
              type="text"
              placeholder="Site URL"
              value={this.state.url}
              onChange={this.handleChangeUrl.bind(this)}
            />
            { showProveOwnershipBtn ? <button className="btn prove">{'prove ownership'}</button> : null }
            <div className="status">
              <h3>{'Status:'} {'Waiting for proving ownership'}</h3>
              <small>{'Please approve your site before sending traffic'}</small>
            </div>
            <input
              type="text"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChangeDescription.bind(this)}
            />
            <div className="form-actions">
              <button className="btn success">{'add'}</button>
              <button className="btn cancel">{'cancel'}</button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}
