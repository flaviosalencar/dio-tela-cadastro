import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPermIdentity, MdCall } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, VoltarText, Row, Wrapper } from './styles';

const Register = () => {

    const navigate = useNavigate();
    const handleClickSignIn = () => {
        navigate('/login')
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);

            if (data.length && data[0].id) {
                alert('Usuário já existe. Efetue o login')
                return
            }
        } catch (e) {
            alert('Simulação de cadastro efetuado!')
            navigate('/login')
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdPermIdentity />} name="nome" control={control} />
                        {errors.nome && <span>Nome completo é obrigatório</span>}

                        <Input placeholder="Seu melhor @e-mail" leftIcon={<MdEmail />} name="email" control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}

                        <Input type="tel" placeholder="Celular ex: 11 96123-4567" leftIcon={<MdCall />}
                            name="celular" control={control} pattern="[0-9]{2} [0-9]{5}-[0-9]{4}" />
                        {errors.celular && <span>Número de celular é obrigatório</span>}

                        <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}

                        <Button title="Cadastrar" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <VoltarText onClick={handleClickSignIn}>Voltar para login</VoltarText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Register }