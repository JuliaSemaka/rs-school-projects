import {Router} from 'express';
import { ICreateCategory } from './category.module';
import {createCategory, deleteCategory, getCategories} from './repository';

const router = Router();

router.get('/', async (req,res) => {
    const categories = await getCategories();
    res.json(categories);
});

router.delete('/:indexCategory', async (req, res) => {
    const indexCategory = Number(req.params.indexCategory);
    if (indexCategory === undefined) {
        return res.sendStatus(400);
    }
    try {
        await deleteCategory(indexCategory);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(404).send(e);
    }
});

router.post('/', async (req, res) => {
    const { nameCategory }: ICreateCategory = req.body;
    if (!nameCategory) {
        res.sendStatus(400);
    }
    try {
        await createCategory(nameCategory);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(404).send(e);
    }
})

export default router;