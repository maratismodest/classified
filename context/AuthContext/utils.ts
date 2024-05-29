import * as jose from 'jose';

const MESSAGE_TOKEN_ERROR =
  'Что-то пошло не так: попробуйте перезапустить сайт/бота и авторизоваться заново';

const decodeToken = async (token: string) => {
  try {
    const decoded: jose.JWTPayload = await jose.decodeJwt(token);
    return decoded;
  } catch (error) {
    console.error('decodeToken', error);
  }
};

export { MESSAGE_TOKEN_ERROR, decodeToken };
