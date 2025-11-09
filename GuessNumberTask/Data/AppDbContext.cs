using GuessNumberTask.Models;
using Microsoft.EntityFrameworkCore;

namespace GuessNumberTask.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
}

