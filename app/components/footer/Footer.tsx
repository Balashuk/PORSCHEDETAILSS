import Link from "next/link";
import Container from "../Containers";
import FooterList from "./Footers";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-12 pb-6 gap-8 md:gap-0">
                    {/* Моделі автомобілів */}
                    <FooterList>
                        <h3 className="text-base font-bold mb-4">Моделі автомобілів</h3>
                        <Link href="#">911</Link>
                        <Link href="#">Panamera</Link>
                        <Link href="#">Cayenne</Link>
                        <Link href="#">Taycan</Link>
                        <Link href="#">Macan</Link>
                    </FooterList>
                    {/* Інформація для покупців */}
                    <FooterList>
                        <h4 className="text-base font-bold mb-4">Інформація для покупців</h4>
                        <Link href="#">Контактна інформація</Link>
                        <Link href="#">Доставка</Link>
                        <Link href="#">Повернення та обмін</Link>
                        <Link href="#">Питання та відповіді</Link>
                    </FooterList>

                    {/* Про нас */}
                    <div className="w-full md:w-1/3">
                        <h4 className="text-base font-bold mb-4">Про нас</h4>
                        <p className="mb-4 text-justify leading-6">
                            Магазин Детай Порш спеціалізується на продажу запчастин для автомобілів. Ми пропонуємо
                            широкий асортимент деталей високої якості для різних марок та моделей автомобілів. Наші
                            фахівці допоможуть підібрати потрібні запчастини, забезпечуючи швидку доставку та
                            конкурентоспроможні ціни.
                        </p>
                        <p>&copy; {new Date().getFullYear()} Porsche Details</p>
                    </div>

                    {/* Соціальні мережі */}
                    <FooterList>
                        <h4 className="text-base font-bold mb-4">Слідкуйте за нами</h4>
                        <div className="flex gap-4">
                            <Link href="#">
                                <MdFacebook size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24} />
                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24} />
                            </Link>
                            <Link href="#">
                                <FaTelegram size={24} />
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
