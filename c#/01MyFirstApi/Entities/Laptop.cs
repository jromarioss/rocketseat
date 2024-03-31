namespace _01MyFirstApi.Entities;

public sealed class Laptop : Device
{
    public override string GetBrand()
    {
        throw new NotImplementedException();
    }

    public string GetModel()
    {
        var isConnected = IsConnected();
        if (isConnected)
        {
            return "MaxBook";
        }
        return "Unknow";
    }

    public override string Hello()
    {
        return "Topzeira";
    }
}
