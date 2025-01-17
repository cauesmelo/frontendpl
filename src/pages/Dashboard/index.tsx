import { useCallback, useContext, useEffect, useState } from 'react';
import * as S from './styled';
import { Header } from '../../components/Header';
import { SearchBar } from './components/SearchBar';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { Card } from './components/Card';
import { Modal } from '../../components/Modal';
import { ModalCreateCard } from './components/ModalCreateCard';
import { PokeContext } from '../../PokeContext';
import { ScrollTop } from './components/ScrollTop';

export const Dashboard = () => {
  const { page, setShowCreateModal, showDeleteModal, setShowDeleteModal, loadNextPage, isSearch, pokemons } =
    useContext(PokeContext);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleScroll = useCallback(() => {
    window.screen.height / 2 < window.scrollY ? setShowScrollTop(true) : setShowScrollTop(false);
    Math.ceil(window.innerHeight + window.scrollY + 200) >= document.documentElement.scrollHeight && loadNextPage();
  }, [loadNextPage]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <S.Container>
      <Modal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title="Excluir"
        text="Certeza que deseja excluir?"
        type="DELETE"
        cancelText="Cancelar"
        actionText="Excluir"
      />
      <ModalCreateCard />
      <ScrollTop show={showScrollTop} action={handleScrollToTop} />
      <Header />
      <SearchBar />

      <S.Main>
        <S.MainTitleWrapper>
          <Title>{isSearch ? `Resultado para busca` : 'Lista de pokemons'}</Title>
          <Button buttonText="Novo Card" onClick={handleCreate} />
        </S.MainTitleWrapper>

        <S.CardsWrapper>
          {page.map(poke => (
            <Card image={poke.image} cardText={poke.name} key={poke.id} />
          ))}
        </S.CardsWrapper>
        {page.length === 0 && pokemons.length === 0 && <S.Message>Carregando primeira página...</S.Message>}
        {page.length !== 0 && pokemons.length === 0 && <S.Message>Carregando próxima página...</S.Message>}
        {page.length === 0 && pokemons.length !== 0 && <S.Message>Nenhum resultado encontrado.: (</S.Message>}
      </S.Main>
    </S.Container>
  );
};
