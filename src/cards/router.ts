import {Router} from 'express';
import {getCards,getCardsById,deleteCard} from './repository';

const router = Router();

router.get('/', async (req,res) => {
    const cards = await getCards();
    res.json(cards);
});

router.get('/:id', async (req, res) => {
    const cardId = Number(req.params.id);
    if(!cardId) {
        return res.sendStatus(400);
    }
    const card = await getCardsById(cardId);
    if (!card) {
        return res.sendStatus(404);
    }
    res.json(card);
});

router.delete('/:indexCategory/:indexCard', async (req, res) => {
    const indexCategory = Number(req.params.indexCategory);
    const indexCard = Number(req.params.indexCard);
    if (!indexCategory || !indexCard) {
        return res.sendStatus(400);
    }
    try {
        await deleteCard(indexCategory, indexCard);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(404).send(e);
    }
});

export default router;