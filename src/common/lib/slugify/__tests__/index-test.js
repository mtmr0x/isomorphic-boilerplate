import slugify from './../index';

describe('slugify lib', () => {
  it('is returning slugged string', () => {
    expect(slugify('Bélgica')).toEqual('belgica');
    expect(slugify('Eslovênia')).toEqual('eslovenia');
    expect(slugify('Estados Unidos')).toEqual('estados-unidos');
    expect(slugify('Vários Países')).toEqual('varios-paises');
    expect(slugify('Escócia')).toEqual('escocia');
    expect(slugify('República Tcheca')).toEqual('republica-tcheca');
  });

  it('is returning custom separator', () => {
    expect(slugify('República Tcheca', '_')).toEqual('republica_tcheca');
  })

  it('is returning empty string in case of empty string be passed', () => {
    expect(slugify('')).toEqual('');
  });
});

