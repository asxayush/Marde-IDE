import redis from '../../../shared/redis/redis.js';
import Project from '../models/project.model.js';

export const createProject = async (req, res) => {
    try {
        const userId = req.header('x-user-id')
        // Use the userId to create the project

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // Assuming you have a Project model and a function to create a project
        const { name, description } = req.body;
        const project = await Project.create({
            owner: userId,
            name,
            description
        });

        const key = `projects-${userId}`
        await redis.del(key) // Invalidate the cache for this user's projects

        return res.status(201).json({ message: 'Project created successfully', project: project });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getProjects = async (req, res) => {
    try {
        const userId = req.header('x-user-id')
        // Use the userId to create the project

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const key = `projects-${userId}`
        let result = await redis.get(key)
        if(result) {
            return res.status(200).json(JSON.parse(result));
        }

        const projects = (await Project.find({ owner: userId })).toSorted({ updatedAt: -1 });

        await redis.set(key, JSON.stringify(projects))

        return res.status(200).json(projects);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'get projects server error' });


    }
}

export const getProjectById = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        project.lastOpenedAt = new Date();
        await project.save();

        return res.status(200).json(project);

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'get project byId error' });
    }
}

export const getStarredProjects = async (req, res) => {
    try {
        const userId = req.header('x-user-id')
        // Use the userId to create the project

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const key = `projects-${userId}`
        let result = await redis.get(key)
        if(result) {
            return res.status(200).json(JSON.parse(result));
        }

        const projects = (await Project.find({
            owner: userId,
            starred: true
        })).sort({ updatedAt: -1 });

         await redis.set(key, JSON.stringify(projects))

        return res.status(200).json(projects);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'get starred projects server error' });
    }
}

export const toggleStar = async (req, res) => {
    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.starred = !project.starred;
        await project.save();

        const key = `projects-${userId}`
        await redis.del(key)
        return res.status(200).json(project);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'toggle starred projects server error' });
    }
}

export const deleteProject = async (req, res) => {
    try {

        const { id } = req.params;


        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const key = `projects-${userId}`
        await redis.del(key)



        return res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'delete project server error' });
    }
}