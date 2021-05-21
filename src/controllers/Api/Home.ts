import Locals from '../../providers/Locals';

class Home {
	public static index(req, res): any {
		return res.json({
			message: Locals.config().name,
		});
	}
}

export default Home
