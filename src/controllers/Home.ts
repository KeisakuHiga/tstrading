import Locals from '../providers/Locals';

class Home {
	public static index(req: any, res: any): any {
		return res.json({
			message: Locals.config().name,
		});
	}
}

export default Home;
