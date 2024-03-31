namespace _01MyFirstApi.Entities;

public abstract class Device
{
    protected bool IsConnected() => true;

    public abstract string GetBrand(); // colocar o abstract obriga todas classe que instância o device usar o método getbrand

    public virtual string Hello()
    {
        return "Hello world";
    }
}
