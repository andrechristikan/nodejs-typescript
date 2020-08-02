import { Request, Response, NextFunction } from 'express';

class TestController {
    public test = (req: Request, res: Response, next: NextFunction) => {
        const response: APIResponse = new APIResponse(
            Enum.HttpSuccessStatusCode.OK,
            language('test.get.ok')
        );
        res.status(response.code).json(response);
    };
}

export default TestController;
